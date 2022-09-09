const { ProjCDKTypescriptProject } = require("@randyridgley/awscdk-app-ts");
const project = new ProjCDKTypescriptProject({
    gitignore: [
        '/cdk.out/'
    ]
});
project.synth();