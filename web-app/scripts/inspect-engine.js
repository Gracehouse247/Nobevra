const fs = require('fs');

const srcFile = 'C:\\Projects\\NobleInvoice Web App Project\\web-app\\src\\components\\invoice\\TemplateEngine.tsx';
let content = fs.readFileSync(srcFile, 'utf8');

const findFunctionBounds = (funcName) => {
    let searchStr = `const ${funcName} = (`;
    let startIndex = content.indexOf(searchStr);
    if (startIndex === -1) {
        searchStr = `const ${funcName} = () =>`;
        startIndex = content.indexOf(searchStr);
    }
    
    if (startIndex === -1) return null;
    
    let braceStart = content.indexOf('{', startIndex);
    let braceCount = 1;
    let i = braceStart + 1;
    while (braceCount > 0 && i < content.length) {
        if (content[i] === '{') braceCount++;
        if (content[i] === '}') braceCount--;
        i++;
    }
    
    let end = i;
    
    // Convert index to line numbers
    let startLine = content.substring(0, startIndex).split('\n').length;
    let endLine = content.substring(0, end).split('\n').length;
    
    return { name: funcName, startLine, endLine, length: endLine - startLine };
}

const funcs = ['renderBackground', 'renderLogo', 'renderHeader', 'renderClientInfo', 'renderTable', 'renderTotals', 'renderFooter', 'renderSidePanel', 'renderTopAccent'];

funcs.forEach(f => {
    let bounds = findFunctionBounds(f);
    if (bounds) {
        console.log(`${bounds.name}: starts at ${bounds.startLine}, ends at ${bounds.endLine} (${bounds.length} lines)`);
    } else {
        console.log(`${f} not found.`);
    }
});
