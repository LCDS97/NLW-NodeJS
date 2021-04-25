import { Entity, PrimaryColumn, CreateDateColumn, Column } from "typeorm"
import { v4 as uuid } from "uuid";

@Entity("messages")
class Message {

    @PrimaryColumn()
    id: string;

    @Column()
    admin_id: string;

    @Column()
    text: string;

    user_id: string;

    @CreateDateColumn()
    create_at: Date;

    constructor(){
        if (!this.id) {
            this.id = uuid();       }
    }
}


export { Message }