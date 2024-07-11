import { styled } from "styled-components";
import { IStickie } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";


const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
`;

const Column = styled.div`
    &:last-child {
        place-self: end;
    }
`;

const Photo = styled.img`
    width: 100px;
    height: 100px;
    border-radius:15px;
`;

const Username = styled.span`
    font-weight: 600;
    font-size: 15px;
`;

const Payload = styled.p`
    margin: 10px 0px;
    font-size: 18px;
`;

const DeleteButton = styled.button`
    background-color: tomato;
    color:white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`;

const EditButton = styled.button`
    background-color: green;
    color:white;
    font-weight: 600;
    border: 0;
    font-size: 12px;
    padding: 5px 10px;
    text-transform: uppercase;
    border-radius: 5px;
    cursor: pointer;
`;


export default function Stickie({ username, photo, stickie, userId, id }: IStickie) {
    const user = auth.currentUser;
    const onDelete = async () => {
        const ok = confirm("Are you sure you want to delete this stickie?");
        if(!ok || user?.uid !== userId) return;
        try {
            await deleteDoc(doc(db, "stickies", id));
            if(photo){
                const photoRef = ref(storage, `stickies/${user.uid}/${id}`);
                await deleteObject(photoRef);
            }
        } catch (e) {
            console.log(e);
        } finally {

        }
    };

    const onEdit = async () => {
        const ok = confirm("Are you sure you want to edit this stickie?");
        if (!ok || user?.uid !== userId) return;
        const newContent = prompt("Enter the new content for the stickie:");
        if (!newContent) return;
        try {
            await updateDoc(doc(db, "stickies", id), { 
                stickie: newContent
             });
        } catch (e) {
            console.log(e);
        } finally {

        }
    };
    
    return (
        <Wrapper>
            <Column>
                <Username>{username}</Username>
                <Payload>{stickie}</Payload>
                {user?.uid == userId? (
                    <><DeleteButton onClick={onDelete}>Delete</DeleteButton><EditButton onClick={onEdit}>Edit</EditButton></>
                ) : null}
            </Column>
            <Column>{photo ? <Photo src={photo}/> : null}</Column>
        </Wrapper>
    );
}