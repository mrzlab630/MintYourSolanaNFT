/**
 *
 * by mrZ
 * Email: mrZ@mrZLab630.pw
 * Date: 2021-10-14
 * Time: 17:07
 * About:
 *
 */

export interface Inote {
    user_id: string,
    note_id: string,
    note: string,
    password?: string,
    encrypt?: string,
    delete_after_reading?: number,
    status: number,
    creat_at: number

}