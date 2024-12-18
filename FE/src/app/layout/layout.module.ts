import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        HeaderComponent,
        ContentComponent,
        FooterComponent
    ],
    exports: [
        ContentComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [ProductService, UserService, LocalStorageService]
})
export class LayoutModule{

}
