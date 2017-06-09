import { Injectable } from '@angular/core';
import { LoginService } from "../login/login.service";
import { WarehouseService } from "../warehouse/warehouse.service";
import { Warehouse } from "../warehouse/warehouse";

@Injectable()
export class ReportService {
	private warehouseList: Warehouse[] = [];
	constructor(private loginService: LoginService, private warehouseService: WarehouseService) { }
	setWarehouseList(): void {
		let idWarehouseCompany = this.loginService.getLoggedUser().warehouseCompany.idWarehouseCompany;

		this.warehouseService.getWarehouse(idWarehouseCompany, -1, -1).subscribe(data => {
				this.warehouseList = data;
		});
	}
	getWarehouseList(): Warehouse[] {
		return this.warehouseList;
	}
}