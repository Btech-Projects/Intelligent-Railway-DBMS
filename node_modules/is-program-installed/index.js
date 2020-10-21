const { execSync } = require('child_process')

const os = process.platform || require('os').platform()

const exec = (cmd, opts) => execSync(cmd, opts).toString('utf8').trim()

const isLinuxInstalled = (program) => {
  try {
    exec(`hash ${program} 2>/dev/null`)
    return true
  } catch {
    return false
  }
}

const isMacInstalled = (program) => {
  try {
    exec(`osascript -e 'id of application "${program}"' 2>&1>/dev/null`)
    return true
  } catch {
    return false
  }
}

module.exports = os === 'darwin' ? isMacInstalled : isLinuxInstalled
