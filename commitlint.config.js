module.exports = {
    extends: [
        "@commitlint/config-conventional"
    ],
    rules: {
        "type-enum": [2, "always", [
            "feat", "fix", "docs", "style", "refactor", "perf", "test", "chore", "revert"
        ]],
        "scope-enum": [2, "always", ["fast-housing-front", "email-service", "face-detection-service"]],
        "subject-full-stop": [0, "never"],
        "subject-case": [0, "never"],
        "header-max-length": [2, "always", 80],
        "body-max-line-length": [2, "always", 72],
    }
}