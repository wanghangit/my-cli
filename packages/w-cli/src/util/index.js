import axios from 'axios';
import { promisify } from 'util';
import fs from 'fs';
import ora from 'ora';
import downloadGitRepo from 'download-git-repo';
import ncp from 'ncp';
import { ORGS, DOWNLOAD_DIR } from '../constants/index.js';

const downloadGitRepoPromise = promisify(downloadGitRepo);

export const getData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const fetchWithLoading = (func, message) => async (...args) => {
  const spinner = ora(message);
  spinner.start();
  const result = await func(...args);
  spinner.succeed();
  return result;
};

export const download = async (repo, tag) => {
  let url = `${ORGS}/${repo}`;
  if (tag) {
    url += `#${tag}`;
  }
  const dest = `${DOWNLOAD_DIR}/${repo}`;
  let stats;
  try {
    stats = await promisify(fs.stat)(dest);
  } catch (error) {}
  // 文件存在直接复用
  if (stats && stats.isDirectory()) {
    return dest;
  }
  await fetchWithLoading(downloadGitRepoPromise, `Downloading ${repo}...`)(url, dest);
  return dest;
};

export const copy = async (src, dest) => {
  await fetchWithLoading(promisify(ncp), 'Copying files...')(src, dest);
};
