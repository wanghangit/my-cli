import path from 'path';
import Inquirer from 'inquirer';
import {
  getData, fetchWithLoading, download, copy,
} from '../util/index.js';
import { ORGS } from '../constants/index.js';

async function fetchGitRepo() {
  return getData(`https://api.github.com/orgs/${ORGS}/repos`);
}

async function fetchGitTags(repoName) {
  return getData(`https://api.github.com/repos/${ORGS}/${repoName}/tags`);
}

/**
 *
 * @param {*} projectName
 */
async function create(projectName) {
  const list = await (fetchWithLoading(fetchGitRepo, 'fetch template ....')());
  if (list.length === 0) {
    console.warn('template empty');
    return;
  }
  const repoNames = list.map((item) => item.name);
  const { repo } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choose a repo',
    choices: repoNames,
  });
  const tags = await (fetchWithLoading(fetchGitTags, `fetch tags of ${repo}....`))(repo);
  let tag = '';
  if (tags && tags.length > 0) {
    const data = await Inquirer.prompt({
      name: 'tag',
      type: 'list',
      message: 'please choose a tag',
      choices: tags.map((item) => item.name),
    });
    tag = data.tag;
  }
  const downloadDest = await download(repo, tag);
  copy(downloadDest, path.resolve(process.cwd(), projectName));
}

export default create;
