import { existsSync, mkdirSync, readdirSync, copyFileSync, statSync, rmSync } from 'fs';
import { join } from 'path';

const sourceDir = 'allure-results';
const targetDir = 'reports/allure-results';

if (existsSync(sourceDir)) {
  // Create target directory if it doesn't exist
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }
  
  // Copy all files from source to target
  const files = readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = join(sourceDir, file);
    const targetPath = join(targetDir, file);
    
    if (statSync(sourcePath).isFile()) {
      copyFileSync(sourcePath, targetPath);
    }
  });
  
  console.log(`Allure results moved from ${sourceDir} to ${targetDir}`);
} else {
  console.log(`No ${sourceDir} directory found`);
}

