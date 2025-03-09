@echo off
setlocal enabledelayedexpansion
set toolsdir=%cd%
pushd %cd%\..
set musicdir=%cd%
set vipmusicdir=%cd%\VipSongsDownload
set mp3=%cd%\mp3\
set flac=%cd%\flac\
@mkdir %mp3%\
@mkdir %flac%\
forfiles /P %vipmusicdir% /M *.mgg /C "cmd /c  %toolsdir%\um -i @file --rs -o %musicdir%"
forfiles /P %vipmusicdir% /M *.mflac /C "cmd /c  %toolsdir%\um -i @file  --rs -o %flac%"
forfiles /P %musicdir% /M *.ogg /C "cmd /c %toolsdir%\ff -n -i @file -b:a 320k %mp3%\@fname.mp3"


start %musicdir%
pause