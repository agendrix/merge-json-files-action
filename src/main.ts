import * as core from "@actions/core";
import { randomBytes } from "crypto";
import { readFileSync, writeFileSync } from "fs";
import { validateRequiredInputs } from "../helpers/action/validateRequiredInputs";

async function run(): Promise<void> {
  try {
    validateRequiredInputs(["file_1_path", "file_2_path"]);

    const fileOnepath = core.getInput("file_1_path", { required: true });
    const fileTwopath = core.getInput("file_2_path", { required: true });

    const fileOne = JSON.parse(readFileSync(fileOnepath).toString());
    const fileTwo = JSON.parse(readFileSync(fileTwopath).toString());

    const mergedFile = Object();
    [...fileOne, ...fileTwo].forEach(item => {
      mergedFile[item.name] = item;
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
