const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 工具配置
const config = {
  toolsDir: __dirname,
  musicDir: __dirname,
  outputDirs: ['flac', 'mp3']
};

// 创建输出目录
function createOutputDirs() {
  config.outputDirs.forEach(dir => {
    const dirPath = path.join(config.musicDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

// 执行命令并处理错误
function executeCommand(cmd, filename) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`[错误] 操作失败: ${filename}`);
    return false;
  }
  return true;
}

// 处理文件转换
async function processFiles() {
  createOutputDirs();

  // 处理.mgg文件
  fs.readdirSync(config.musicDir)
    .filter(f => f.endsWith('.mgg'))
    .forEach(file => {
      console.log(`正在解密: ${file}`);
      const input = path.join(config.musicDir, file);
      const cmd = `"${path.join(config.toolsDir, 'um.exe')}" -i "${input}" --rs -o "${config.musicDir}"`;
      executeCommand(cmd, file);
    });

  // 处理.mflac文件
  fs.readdirSync(config.musicDir)
    .filter(f => f.endsWith('.mflac'))
    .forEach(file => {
      console.log(`正在解密: ${file}`);
      const input = path.join(config.musicDir, file);
      const outputDir = path.join(config.musicDir, 'flac');
      const cmd = `"${path.join(config.toolsDir, 'um.exe')}" -i "${input}" --rs -o "${outputDir}"`;
      executeCommand(cmd, file);
    });

}

// 执行主程序
processFiles()
  .then(() => console.log('全部操作已完成'))
  .catch(err => console.error('运行出错:', err));