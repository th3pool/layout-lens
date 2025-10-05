import { log } from 'console';
import * as vscode from 'vscode';

export let config = vscode.workspace.getConfiguration('layout-lens');
export let enableFlex = config.get('enableFlex', true);
export let enableGrid = config.get('enableGrid', true);
export let enableCommon = config.get('enableCommon', false);

export function updateConfigs(e: vscode.ConfigurationChangeEvent) {
    config = vscode.workspace.getConfiguration('layout-lens');

    if (e.affectsConfiguration('layout-lens.enableFlexbox')) {
        enableFlex = config.get('enableFlexbox', true);
        log(
            `Flexbox highlighting is now ${
                enableFlex ? 'enabled' : 'disabled'
            }.`
        );
    }
    if (e.affectsConfiguration('layout-lens.enableGrid')) {
        enableGrid = config.get('enableGrid', true);
        log(`Grid highlighting is now ${enableGrid ? 'enabled' : 'disabled'}.`);
    }
    if (e.affectsConfiguration('layout-lens.enableCommon')) {
        enableCommon = config.get('enableCommon', true);
        log(
            `Common properties highlighting is now ${
                enableCommon ? 'enabled' : 'disabled'
            }.`
        );
    }
}
