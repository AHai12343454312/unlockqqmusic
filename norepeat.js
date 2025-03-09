const path = require('path');
const fs = require('fs');

function cleanDuplicateMgg() {
  const musicDir = __dirname;
  const files = fs.readdirSync(musicDir);
  
  const mggMap = new Map();
  const mflacMap = new Map();

  // 构建文件名映射（不含扩展名）
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    
    if (ext === '.mgg') {
      mggMap.set(base, file);
    } else if (ext === '.mflac') {
      mflacMap.set(base, file);
    }
  });

  // 遍历所有.mgg文件并检查重复
  let deletedCount = 0;
  mggMap.forEach((file, base) => {
    if (mflacMap.has(base)) {
      try {
        fs.unlinkSync(path.join(musicDir, file));
        console.log(`已删除重复文件: ${file}`);
        deletedCount++;
      } catch (err) {
        console.error(`删除失败 [${file}]: ${err.message}`);
      }
    }
  });

  console.log(`\n清理完成，共删除 ${deletedCount} 个重复文件`);
}

// 执行清理
try {
  cleanDuplicateMgg();
} catch (err) {
  console.error('程序运行出错:', err.message);
}