const PugLint = require('pug-lint')

/**
 * convert pug-lint results
 * to eslint formatter compatible results
 * @param  {[type]} results [description]
 * @return {[type]}         [description]
 */
function resultsAdaptor (results) {
  return results.reduce(function convertResults (
    eResults, // converted results
    pResultsPerFile // pug-lint results, per file
  ) {
    if (pResultsPerFile.length === 0) {
      return
    }
    const r = {}
    r.filePath = pResultsPerFile[0].filename
    r.messages = pResultsPerFile.map(function convertResult (
      pResult // a pug-lint result
    ) {
      // a eslint formatter compatible message
      const eMessage = {}

      /**
       * pug-lint currently doesn't support
       * multiple severity levels
       * use fatal (severity = 2)
       */
      eMessage.fatal = true

      eMessage.message = pResult.msg
      eMessage.line = pResult.line
      eMessage.column = pResult.column

      return eMessage
    })

    return eResults.concat(r)
  }, [])
}

function formatter (results, options) {
  const format = options.formatter.toLowerCase()
  const formatted = require('eslint/lib/formatters/' + format)

  return formatted(resultsAdaptor(results))
}

function outputResults (results, options) {
  console.log(formatter(results, options))
}

function LinterError (message) {
  this.name = 'LinterError'
  this.message = message || ''
}

LinterError.prototype = Object.create(Error.prototype)

exports.LinterError = LinterError

module.exports = function pugLint () {
  this.puglint = function plugin (options) {
    const opt = options || {}

    /**
     * output formatter
     * for available formatter name
     * @see https://github.com/eslint/eslint/tree/master/lib/formatters
     */
    opt.formatter = opt.formatter || 'stylish'

    /**
     * configureation file
     * @type {string}
     * @see https://github.com/pugjs/pug-lint/blob/master/lib/linter.js#L80
     * @see https://github.com/pugjs/pug-lint/blob/master/lib/linter.js#L155
     */
    opt.extends = opt.extends || '.pug-lintrc.js'

    const linter = new PugLint()
    linter.configure(opt)

    return this.unwrap(function lintFiles (files) {
      // results per file
      let results = []
      files.forEach(function lintFile (file) {
        results = results.concat([linter.checkFile(file)])
      })
      outputResults(results, opt)

      /**
         * if any warning/error in results
         * throw a LinterError to fail the task
         */
      const errorCount = results.length

      if (errorCount > 0) {
        throw new LinterError(errorCount + ' errors found.')
      }
    })
  }
}
