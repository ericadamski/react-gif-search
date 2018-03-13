import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import uglify from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";

export default {
  input: "index.js",
  output: {
    file: "dist/index.js",
    format: "cjs",
    sourcemap: true,
    globals: { styled: "styled-components" }
  },
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    }),
    babel({
      exclude: "node_modules/**"
    }),
    commonjs({
      namedExports: {
        rxjs: ["Observable"]
      }
    }),
    replace({
      "process.env.GIPHY_API_KEY": JSON.stringify(
        "JPD6ckEmDDrWwc43S04daTOxhoE0XWKK"
      )
    }),
    uglify({
      sourceMap: true
    })
  ],
  external: ["react", "styled-components"]
};
