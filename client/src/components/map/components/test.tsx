const { Component, createElement: $ } = React;

const totalCommits = (data): number =>
    data.reduce((curr, acc) => (curr ? curr + acc.total : acc.total), 0);
const parseRepos = (repos = ''): string[] => repos.split('\n');

const compileNumbers = async (repo): number => {
    try {
        const data = await getRepoData(repo);
        return totalCommits(data);
    } catch (err) {
        return 0;
    }
};

interface AppState {
    reposToCheck: string;
    repoResults: string[];
}

class App extends Component<null, AppState> {
    constructor(props) {
        super(props);
        this.state = {
            reposToCheck: '',
            repoResults: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleChange(e): void {
        this.setState({
            reposToCheck: e.target.value,
        });
    }

    async handleClick(): void {
        const { reposToCheck } = this.state;
        const parsedRepos = parseRepos(reposToCheck);
        try {
            const repoCounts = await Promise.all(
                parsedRepos.map(async (repo: string) => {
                    const commits = await compileNumbers(repo);
                    return `${repo}:${commits}`;
                })
            );

            this.setState({
                repoResults: repoCounts,
            });
        } catch (err) {
            this.setState({
                repoResults: ['error finding data'],
            });
        }
    }

    render() {
        const { repoResults } = this.state;
        const result = repoResults.length !== 0 ? repoResults.join('\n') : null;
        return $(
            'div',
            {},
            $('h1', {}, 'Input'),
            $('textarea', { onChange: this.handleChange }, 'facebook/react\nmicrosoft/typescript'),
            $('button', { onClick: this.handleClick }, 'Run'),
            $('h1', {}, 'Output'),
            $('div', { className: 'result' }, result)
        );
    }
}

// const App = () => {
//     const state: AppState = {
//         reposToCheck: '',
//         repoResults: [],
//     };

//     const handleChange = (e): void => {
//         state.reposToCheck = e.target.value;
//     };

//     const handleRun = async (): void => {
//         const parsedRepos = parseRepos(state.reposToCheck);
//         try {
//             const items = await Promise.all(parsedRepos.map(async (repo: string) => {
//                 const commits = await compileNumbers(repo);
//                 return `${repo}:${commits}`;
//             }));

//           state.repoResults = items;
//         } catch (err) {
//             state.repoResults = ['error finding data'];
//         }
//     };

//     const result = state.repoResults.length !== 0 ? state.repoResults.join('\n') : null;

//     return $('div', {},
//         $('h1', {}, 'Input'),
//         $('textarea', { onChange: handleChange }, 'facebook/react\nmicrosoft/typescript'),
//         $('button', { onClick: handleRun }, 'Run'),
//         $('h1', {}, 'Output'),
//         $('div', { className: 'result' }, result)
//     );
// };

//////// Don't change anything below ////////

interface GitHubWeekData {
    readonly days: readonly number[];
    readonly total: number;
    readonly week: number;
}

const getRepoData = async (repo: string): Promise<readonly GitHubWeekData[]> => {
    const resp = await slowFetch(`https://api.github.com/repos/${repo}/stats/commit_activity`);
    if (!resp.ok) {
        throw Error(`${resp.status}: ${resp.statusText}`);
    }
    return resp.json();
};

const slowFetch = async (url: string): Promise<Response> => {
    await new Promise((resolve) => {
        setTimeout(resolve, 2000);
    });
    return fetch(url);
};

ReactDOM.render($(App), document.getElementById('app'));
