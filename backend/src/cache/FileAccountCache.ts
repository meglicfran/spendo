export interface AccountMetadataRecord {
	cache_saved: string;
}

export interface AccountTransactionsRecord {
	cache_saved: string;
}

export interface AccountCacheStrategy {
	getAccountMetadata(accountId: string): AccountMetadataRecord;
	setAccountMetadata(accountId: string, metadata: any): void;
	getAccountTransactions(accountId: string, date_from: string, date_to: string): AccountTransactionsRecord;
	setAccountTransactions(accountId: string, date_from: string, date_to: string, transactions: {}): void;
}

import fs from "fs";

export class FileAccountCache implements AccountCacheStrategy {
	private accountMetadataPath: string;
	private accountTransactionsPath: string;

	constructor(accountMetadataPath: string, accountTransactionsPath: string) {
		this.accountMetadataPath = accountMetadataPath;
		this.accountTransactionsPath = accountTransactionsPath;
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
	getAccountTransactions(accountId: string, date_from: string, date_to: string): AccountTransactionsRecord {
		const accountTransactions = this.getMapFromFile(this.accountTransactionsPath);
		return accountTransactions.get(JSON.stringify({ accountId, date_from, date_to }));
	}

	setAccountTransactions(accountId: string, date_from: string, date_to: string, transactions: any): void {
		const today = new Date();
		const transactionsRecord = { ...transactions, cache_saved: today };
		const accountTransactions = this.getMapFromFile(this.accountTransactionsPath);
		accountTransactions.set(JSON.stringify({ accountId, date_from, date_to }), transactionsRecord);
		this.saveMapToFile(this.accountTransactionsPath, accountTransactions);
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
