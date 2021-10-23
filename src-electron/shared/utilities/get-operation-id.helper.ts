import { toTitleCase } from './string-utils';

export function GetOperationId(model: string, operation: string) {
    const _model = toTitleCase(model).replace(/\s/g, '');
    const _opereration = toTitleCase(operation).replace(/\s/g, '');

    return {
        title: '',
        operationId: `${_model}_${_opereration}`,
    };
}

