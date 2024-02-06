module.exports = {
  extends: ["airbnb", "airbnb-typescript", "prettier"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  settings: {
    // エイリアスの設定
    "import/resolver": {
      typescript: {
        project: "./",
      },
      node: {
        paths: ["src"],
        extensions: [".ts", ".tsx"],
      },
    },
  },
  rules: {
    // インポート順序
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "{react,react-dom/**,react-router-dom}",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "@/**",
            group: "parent",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
        },
        "newlines-between": "always",
      },
    ],
    // ファイル拡張子の指定を無効にする
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
      },
    ],
    // ReactをimportしなくてもJSXが使えるようにする
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
  },
};
