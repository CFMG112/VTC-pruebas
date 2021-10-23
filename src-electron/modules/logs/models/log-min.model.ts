import { Expose } from 'class-transformer';

export class LogMinified {
    @Expose()
    job: string;

    @Expose()
    tim: string;

    @Expose()
    ot: number;

    @Expose()
    wt: number;

    @Expose()
    at: number;

    @Expose()
    tp: number;

    @Expose()
    ll: number;

    @Expose()
    sp: number;

    @Expose()
    pr: number;

    @Expose()
    st: number;

    @Expose()
    ct: number;
}
