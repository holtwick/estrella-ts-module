#!/usr/bin/env node

const { build } = require("estrella");
const pkg = require("./package.json");
const ts = require("typescript");
const tsconfig = require("./tsconfig.json");

build({
  bundle: true,
  sourcemap: true,
  format: "cjs",
  entry: "src/index.ts",
  outfile: pkg.main,
});

// https://github.com/rsms/estrella/issues/24#issuecomment-796314970
function generateTypeDefs() {
  const filenames = ["src/index.ts"];
  const compilerOptions = {
    ...tsconfig,
    declaration: true,
    outDir: "dist",
  };
  const program = ts.createProgram(filenames, compilerOptions);
  const emitResult = program.emit();
  // check emitResult.diagnostics and .emittedFiles
}

build({
  bundle: true,
  sourcemap: true,
  format: "esm",
  entry: "src/index.ts",
  outfile: pkg.module,
  onStart: generateTypeDefs,
});
