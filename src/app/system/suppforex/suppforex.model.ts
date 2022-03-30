import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class SuppForexModel {
constructor(


        public suppForexId: number,
public currency: number,
                public fromDate: Date,
                public toDate: Date,
                public amount: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

