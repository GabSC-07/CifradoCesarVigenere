const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const assert = require('assert');

// Función de Cifrado
function Cifrar(text, key) {
    const keyRepeat = key.repeat( Math.ceil(text.length / key.length) ).toUpperCase();

    return text.toUpperCase().split('').map( (char, i) => {
        const index = abecedario.indexOf(char);
        
        if (index === -1) return char; // No es una letra

        const keyIndex = abecedario.indexOf(keyRepeat[i]);
        return abecedario[(index + keyIndex) % 26];
    }).join('');
}

// Función de Descifrado
function Descifrar(text, key) {
    const keyRepeat = key.repeat( Math.ceil(text.length / key.length) ).toUpperCase();

    return text.toUpperCase().split('').map((char, i) => {
        const index = abecedario.indexOf(char);

        if (index === -1) return char; // No es una letra

        const keyIndex = abecedario.indexOf(keyRepeat[i]);
        return abecedario[(index - keyIndex + 26) % 26];
    }).join('');
}

// Pruebas con Mocha

describe('Cifrado Vigenère', function() {
    it('Debe cifrar correctamente', function() {
        const result = Cifrar('Hola', 'KEY');  // Texto a cifrar + la llave
        assert.strictEqual(result, 'RSJK');
    });

    it('Debe descifrar correctamente', function() {
        const result = Descifrar('RIJVS', 'KEY');   // Texto a descifrar + la llave
        assert.strictEqual(result, 'HELLO');
    });

    it('Debe manejar caracteres no alfabéticos', function() {
        const result = Cifrar('Hola chicos como estan!', 'BATIZ');   // Texto a cifrar + la llave
        assert.strictEqual(result, 'IOEI DHBKNT VWLP XASBN!');
    });
});

describe('Abecedario', function() {
    it('Debe mostrar el abecedario', function() {
        assert.strictEqual(abecedario, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    });
});
