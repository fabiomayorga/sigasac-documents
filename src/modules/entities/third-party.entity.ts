import {
    Entity,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { PurchaseOrder } from './purchase-order.entity';

@Entity({ name: 'third_parties' })
export class ThirdParty {
    @PrimaryGeneratedColumn('increment', {
        name: 'id',
        type: 'integer',
        unsigned: true
    })
    id: number;

    @Column({ name: 'code', type: 'varchar' })
    code: string;

    @Column({ name: 'business_name', type: 'varchar' })
    businessName: string;

    @Column({ name: 'surname', type: 'varchar', nullable: true })
    surname: string;

    @Column({ name: 'surname_2', type: 'varchar', nullable: true })
    surname2: string;

    @Column({ name: 'name', type: 'varchar', nullable: true })
    name: string;

    @Column({ name: 'name_2', type: 'varchar', nullable: true })
    name2: string;

    @Column({ name: 'phones', type: 'varchar', nullable: true })
    phones: string;

    @Column({ name: 'cellphone', type: 'varchar', nullable: true })
    cellphone: string;

    @Column({ name: 'fax', type: 'varchar', nullable: true })
    fax: string;

    @Column({ name: 'postal_code', type: 'varchar', nullable: true })
    postalCode: string;

    @Column({ name: 'address', type: 'varchar', nullable: true })
    address: string;

    @Column({ name: 'document_number', type: 'varchar', nullable: true })
    documentNumber: string;

    @Column({ name: 'public_entity', type: 'varchar', nullable: true })
    publicEntity: string;

    @Column({ name: 'vat_regime', type: 'varchar', nullable: true })
    vatRegime: string;

    @Column({ name: 'state', type: 'smallint', width: 1, default: 1 })
    state: number;

    @Column({
        name: 'declare_income',
        type: 'smallint',
        width: 1,
        nullable: true,
        default: 0
    })
    declareIncome: number;

    @Column({
        name: 'is_withholding_agent',
        type: 'smallint',
        width: 1,
        nullable: true,
        default: 0
    })
    isWithholdingAgent: number;

    @Column({
        name: 'is_great_contributor',
        type: 'smallint',
        width: 1,
        nullable: true,
        default: 0
    })
    isGreatContributor: number;

    @Column({
        name: 'is_self_retainer',
        type: 'smallint',
        width: 1,
        nullable: true,
        default: 0
    })
    isSelfRetainer: number;

    @Column({
        name: 'vat_invoice',
        type: 'smallint',
        width: 1,
        nullable: true,
        default: 0
    })
    vatInvoice: number;

    @Column({
        name: 'retention_effect',
        type: 'smallint',
        width: 1,
        nullable: true,
        default: 0
    })
    retentionEffect: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp without time zone',
        select: false
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp without time zone',
        select: false
    })
    updatedAt: Date;

    @Column({ name: 'document_type_id', type: 'integer' })
    documentTypeId: number;

    @Column({ name: 'type_person_id', type: 'integer' })
    typePersonId: number;

    @Column({ name: 'third_party_type_id', type: 'integer' })
    thirdPartyTypeId: number;

    @Column({ name: 'school_id', type: 'integer' })
    schoolId: number;

    // relationships
    @OneToMany(
        type => PurchaseOrder,
        purchaseOrder => purchaseOrder.thirdParty
    )
    public purchaseOrders!: PurchaseOrder[];
}
