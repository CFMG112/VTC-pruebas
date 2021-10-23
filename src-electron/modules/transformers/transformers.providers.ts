import { Transformer } from './models/transformer.model';
import { TransformerView } from './models/transformer-view.model';

export const TRANSFORMER_REPOSITORY = 'TRANSFORMER_REPOSITORY';
export const TRANSFORMER_VIEW_REPOSITORY = 'TRANSFORMER_VIEW_REPOSITORY';

export const transformerRepository = {
    provide: TRANSFORMER_REPOSITORY,
    useValue: Transformer,
};

export const transformerViewRepository = {
    provide: TRANSFORMER_VIEW_REPOSITORY,
    useValue: TransformerView,
};