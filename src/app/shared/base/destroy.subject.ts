import { Directive, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Directive({
	selector: 'app-destroy',
})
export abstract class DestroySubject implements OnDestroy {
	destroy$ = new Subject<void>();
	ngOnDestroy() {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
