import pkg from '../../package.json' assert {type: 'json'};

// git下载地址
export const ORGS = 'wanghan-cli';

export const DOWNLOAD_DIR = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.w_template`;

export const version = pkg.version;
