export interface AccountMetadataRecord {
	cache_saved: string;
}

export interface AccountCacheStrategy {
	getAccountMetadata(accountId: string): AccountMetadataRecord;
	setAccountMetadata(accountId: string, metadata: any): void;
	getAccountTransactions(accountId: string, date_from: Date, date_to: Date): {};
	setAccountTransactions(accountId: string, date_from: Date, date_to: Date, transactions: {}): void;
}

import fs from "fs";

export class FileAccountCache implements AccountCacheStrategy {
	private accountMetadataPath: string;

	constructor(filePath: string) {
		this.accountMetadataPath = filePath;
	}

	getAccountMetadata(accountId: string): AccountMetadataRecord {
		const accountMetadata = this.getMapFromFile(this.accountMetadataPath);
		return accountMetadata.get(accountId);
	}

	setAccountMetadata(accountId: string, metadata: any): void {
		const today = new Date();
		const accountRecord = { ...metadata, cache_saved: today };
		const accountMetadata = this.getMapFromFile(this.accountMetadataPath);
		accountMetadata.set(accountId, accountRecord);
		this.saveMapToFile(this.accountMetadataPath, accountMetadata);
	}
	getAccountTransactions(accountId: string, date_from: Date, date_to: Date): {} {
		throw new Error("Method not implemented.");
	}
	setAccountTransactions(accountId: string, date_from: Date, date_to: Date, transactions: {}): void {
		throw new Error("Method not implemented.");
	}

	private getMapFromFile(filePath: string) {
		const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
		const restoredMap = new Map<string, any>(data);
		return restoredMap;
	}

	private saveMapToFile(filePath: string, map: Map<string, any>) {
		const jsonArray = Array.from(map);
		fs.writeFileSync(filePath, JSON.stringify(jsonArray, null, 2));
	}
}
