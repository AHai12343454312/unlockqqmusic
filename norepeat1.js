const fs = require('fs');
const path = require('path');

// 定义文件类型优先级
const PRIORITY = {
  '.flac': 1,
  '.ogg': 2,
  '.mp3': 3
};

function processFiles() {
  console.log('开始处理重复音频文件...');
  let deleteCount = 0;
  
  // 获取当前目录所有文件
  const files = fs.readdirSync(__dirname);
  
  // 按文件名分组
  const fileGroups = files.reduce((groups, file) => {
    const ext = path.extname(file).toLowerCase();
    // 只处理目标音频格式
    if (!['.flac', '.ogg', '.mp3'].includes(ext)) return groups;
    
    const basename = path.basename(file, ext);
    if (!groups[basename]) {
      groups[basename] = [];
    }
    groups[basename].push({file, ext});
    return groups;
  }, {});

  // 处理每个文件组
  Object.entries(fileGroups).forEach(([basename, files]) => {
    if (files.length <= 1) return;

    // 按优先级排序
    const sorted = files.sort((a, b) => 
      PRIORITY[a.ext] - PRIORITY[b.ext]
    );

    // 保留优先级最高的文件
    const keepFile = sorted[0];
    const deleteFiles = sorted.slice(1);

    // 删除其他文件
    deleteFiles.forEach(({file}) => {
      try {
        fs.unlinkSync(path.join(__dirname, file));
        console.log(`已删除文件: ${file}`);
      } catch (err) {
        console.error(`删除失败: ${file}`, err);
      }
    });
  });
}

processFiles();