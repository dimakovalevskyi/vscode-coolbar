import * as vscode from 'vscode';

let openedPanel: string = '';

function openPanel(panel: string): void {
	closePanel();
	openedPanel = panel;
	vscode.commands.executeCommand('setContext', 'coolbarPanelOpened', true);
	vscode.commands.executeCommand('setContext', 'coolbarPanelOpened_' + panel, true);
}
function closePanel(): void {
	vscode.commands.executeCommand('setContext', 'coolbarPanelOpened', false);
	vscode.commands.executeCommand('setContext', 'coolbarPanelOpened_' + openedPanel, false);
	openedPanel = '';
}
function showMessage(message: string): void {
  vscode.window.showInformationMessage(message);
}

export function activate(context: vscode.ExtensionContext) {
	const commands: Record<string,() => void> = {};

	console.log('coolbar: is now active!');

	commands['vscode-coolbar.close'] = () => {
		closePanel();
	};
	commands['vscode-coolbar.open.git'] = () => {
		openPanel('git');
	};
	commands['vscode-coolbar.open.refactor'] = () => {
		openPanel('refactor');
	};
	commands['vscode-coolbar.git.pull'] = () => {
		vscode.commands.executeCommand('git.pull');
		closePanel();
	};
	commands['vscode-coolbar.git.fetch'] = () => {
		vscode.commands.executeCommand('git.fetch');
		closePanel();
	};
	commands['vscode-coolbar.git.sync'] = () => {
		vscode.commands.executeCommand('git.sync');
		closePanel();
	};
	commands['vscode-coolbar.git.push'] = () => {
		vscode.commands.executeCommand('git.push');
		closePanel();
	};
	commands['vscode-coolbar.git.commit'] = () => {
		vscode.commands.executeCommand('git.commit');
		closePanel();
	};
	commands['vscode-coolbar.git.checkout'] = () => {
		vscode.commands.executeCommand('git.checkout');
		closePanel();
	};
	commands['vscode-coolbar.git.merge'] = () => {
		vscode.commands.executeCommand('git.merge');
		closePanel();
	};

	for (let commandName in commands) {
		let disposable = vscode.commands.registerCommand(commandName, commands[commandName]);
		context.subscriptions.push(disposable);
	}
}

export function deactivate() {}
