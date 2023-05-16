import * as core from "@actions/core";
import { randomBytes } from "crypto";
import { readFileSync, writeFileSync } from "fs";

const fileValues = (path: string) =>
  path ? JSON.parse(readFileSync(path).toString()) : [];

async function run(): Promise<void> {
  try {
    const key = core.getInput("key");
    const filesPath = core.getMultilineInput("files_path");
    const filesValues = filesPath.map(fileValues).flat();

    const mergedFile = Object();
    filesValues.forEach(item => {
      mergedFile[item[key]] = item;
    });

    const tmpFilePath = `/tmp/${randomBytes(16).toString("hex")}.json`;
    const mergedFileContent = JSON.stringify(Object.values(mergedFile));
    writeFileSync(tmpFilePath, mergedFileContent);

    console.log(
      `Merge file was successfully written to ${tmpFilePath} with the following content:`
    );
    console.log(mergedFileContent);

    core.setOutput("merged_file_path", tmpFilePath);
  } catch (error) {
    core.setFailed(`Action failed with error ${error}`);
  }
}

run();
