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

    const mergedFile = { ...fileOne, ...fileTwo };
    const tmpFilePath = `/tmp/${randomBytes(16).toString("hex")}.json`;
    writeFileSync(tmpFilePath, JSON.stringify(mergedFile));

    core.setOutput("merged_file_path", tmpFilePath);
  } catch (error) {
    core.setFailed(`Action failed with error ${error}`);
  }
}

run();
