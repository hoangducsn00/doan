import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { classToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    intercept = (context: ExecutionContext, call$: Observable<any>): Observable<any> =>
        call$.pipe(map((data) => classToPlain(data)));
}
