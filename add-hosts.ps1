$entry = "127.0.0.1    potg.gg"
$hostsPath = "C:\Windows\System32\drivers\etc\hosts"
$content = Get-Content $hostsPath -Raw
if ($content -notmatch "potg\.gg") {
    Add-Content -Path $hostsPath -Value "`n$entry" -Encoding ASCII
    Write-Host "potg.gg 등록 완료!" -ForegroundColor Green
} else {
    Write-Host "이미 등록되어 있습니다." -ForegroundColor Yellow
}
pause
