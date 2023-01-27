const { Console } = require('console');
const vscode = require('vscode');
/**
 * @param {vscode.ExtensionContext} context
 */

// import * as vscode from 'vscode';
const alphabet = new Map();
alphabet.set('й', 'q');
alphabet.set('ц', 'w');
alphabet.set('у', 'e');
alphabet.set('к', 'r');
alphabet.set('е', 't');
alphabet.set('н', 'y');
alphabet.set('г', 'u');
alphabet.set('ш', 'i');
alphabet.set('щ', 'o');
alphabet.set('з', 'p');
alphabet.set('х', '[');
alphabet.set('ъ', ']');
alphabet.set('ф', 'a');
alphabet.set('ы', 's');
alphabet.set('в', 'd');
alphabet.set('а', 'f');
alphabet.set('п', 'g');
alphabet.set('р', 'h');
alphabet.set('о', 'j');
alphabet.set('л', 'k');
alphabet.set('д', 'l');
alphabet.set('ж', ';');
alphabet.set('э', '\'');
alphabet.set('я', 'z');
alphabet.set('ч', 'x');
alphabet.set('с', 'c');
alphabet.set('м', 'v');
alphabet.set('и', 'b');
alphabet.set('т', 'n');
alphabet.set('ь', 'm');
alphabet.set('б', ',');
alphabet.set('ю', '.');
alphabet.set('ё','`');


const alphabet1 = new Map();
alphabet1.set('q', 'й');
alphabet1.set('w', 'ц');
alphabet1.set('e', 'у');
alphabet1.set('r', 'к');
alphabet1.set('t', 'е');
alphabet1.set('y', 'н');
alphabet1.set('u', 'г');
alphabet1.set('i', 'ш');
alphabet1.set('o', 'щ');
alphabet1.set('p', 'з');
alphabet1.set('[', 'х');
alphabet1.set(']', 'ъ');
alphabet1.set('a', 'ф');
alphabet1.set('s', 'ы');
alphabet1.set('d', 'в');
alphabet1.set('f', 'а');
alphabet1.set('g', 'п');
alphabet1.set('h', 'р');
alphabet1.set('j', 'о');
alphabet1.set('k', 'л');
alphabet1.set('l', 'д');
alphabet1.set(';', 'ж');
alphabet1.set('\'', 'э');
alphabet1.set('z', 'я');
alphabet1.set('x', 'ч');
alphabet1.set('c', 'с');
alphabet1.set('v', 'м');
alphabet1.set('b', 'и');
alphabet1.set('n', 'т');
alphabet1.set('m', 'ь');
alphabet1.set(',', 'б');
alphabet1.set('.', 'ю');
alphabet1.set('`','ё');

function activate(context) {
	const disposable = vscode.commands.registerCommand('lab5.RusToEng', function() {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			let word = document.getText(selection);
			let array = word.split('');
			if(array.length == 0){
				throw new UserException("is empty");
			}
			let transleted = [];
			let indexes = [];
			let i = 0;
			array.forEach(function(elem){
				if (elem >= 'А' && elem <= "Я" || elem == "Ё")
					indexes.push(i);
				i += 1;
			})
			word = word.toLowerCase();
			array = word.split('');
			
			let result = [];
			array.forEach(function(elem){
				if (elem >= 'а' && elem <= "я" || elem == "ё")
					result.push(alphabet.get(elem));
				else 
					result.push(elem);
			})

			let cnt = 0;
			i = 0;
		
			result.forEach(function(elem){
				if (i == indexes[cnt]){
					transleted.push(elem.toUpperCase());
					cnt++;
				}
				else 
					transleted.push(elem)
				i += 1;
			})
			editor.edit(editBuilder => {
				editBuilder.replace(selection, transleted.join(''));
			});
			vscode.window.showInformationMessage(`Успешно переведено`);
		}
	});

	context.subscriptions.push(disposable);


	const disposable1 = vscode.commands.registerCommand('lab5.EngToRus', function() {
		// Get the active text editor
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;
			const selection = editor.selection;

			// Get the word within the selection
			let word = document.getText(selection);
			let array = word.split('');
			if(array.length == 0){
				throw new UserException("is empty");
			}
			let transleted = [];
			let indexes = [];
			let i = 0;
			array.forEach(function(elem){
				if (elem >= 'A' && elem <= "Z"){
					indexes.push(i);
					//console.log(i);
				}
				i += 1;
			})
			word = word.toLowerCase();
			array = word.split('');
			
			let result = [];
			array.forEach(function(elem){
				if (elem >= 'a' && elem <= "z")
					result.push(alphabet1.get(elem));
				else 
					result.push(elem);
			})

			let cnt = 0;
			i = 0;
			//console.log(result);
			result.forEach(function(elem){
				if (i == indexes[cnt]){
					transleted.push(elem.toUpperCase());
					cnt++;
				}
				else 
					transleted.push(elem)
				i += 1;
			})
			editor.edit(editBuilder => {
				editBuilder.replace(selection, transleted.join(''));
			});
			vscode.window.showInformationMessage(`Успешно переведено`);
		}
	});

	context.subscriptions.push(disposable1);
}
function UserException(message) {
	this.message = message;
	this.name = "Исключение, определённое пользователем";
 }

function deactivate() {}

module.exports = {
	activate,
	deactivate
}


