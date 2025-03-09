@echo off
setlocal enabledelayedexpansion

:: 设置工具和目录路径（确保路径无中文/空格）
set "toolsdir=%~dp0"    
set "musicdir=%~dp0"    




:: 解密.mgg文件（输出到当前目录）
for %%F in ("%musicdir%\*.mgg") do (
  echo 正在解密: %%~nxF
  "./um.exe" -i "%%F" --rs -o "%musicdir%"
  if errorlevel 1 (
    echo [错误] 解密失败: %%~nxF

  )
)

:: 解密.mflac文件（输出到flac目录）
for %%F in ("%musicdir%\*.mflac") do (
  echo 正在解密: %%~nxF
  "./um.exe" -i "%%F" --rs -o "%flac%"
  if errorlevel 1 (
    echo [错误] 解密失败: %%~nxF

  )
)

:: 转换.ogg到MP3（输出到mp3目录）
for %%F in ("%musicdir%\*.ogg") do (
  echo 正在转换: %%~nxF
  "%toolsdir%\ffmpeg.exe" -n -i "%%F" -b:a 320k "%mp3%\%%~nF.mp3"
  if errorlevel 1 (
    echo [错误] 转换失败: %%~nxF

  )
)




pause