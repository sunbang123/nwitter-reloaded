import { styled } from "styled-components";
import { IStickie } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 3fr 1fr;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 15px;
`;

const Form = styled.form<{ show: String }>`
    display: ${props => props.show ? 'flex' : 'none'};
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 2px solid ;
    padding: 20px;
    margin-top:20px;
    font-size: 16px;
    color: black;
    background-color: white;
    width: 100%;
    resize: none;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    &::placeholder {
        font-size: 16px;
    }
    &:focus{
        outline: none;
        border-color: #3C950B;
    }
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

const Payload = styled.p<{ show: String }>`
    display: ${props => props.show ? 'flex' : 'none'};
    margin: 10px 0px;
    font-size: 18px;
`;

const DeleteButton = styled.button<{ show: String }>`
    display: ${props => props.show ? 'flex' : 'none'};
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
    const [isEditing, setIsEditing] = useState(false);
    
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

    const onEdit = () => {
        setIsEditing(prev => !prev);
    };
    
    return (
        <Wrapper>
            <Column>
                <Username>{username}</Username>
                <Payload show={isEditing ? "" : "show"}>{stickie}</Payload>
                {user?.uid == userId? (
                    <>
                        <DeleteButton show={isEditing ? "" : "show"} onClick={onDelete}>Delete</DeleteButton>
                        <EditButton onClick={onEdit}>Edit</EditButton>
                        <Form show={isEditing ? "show" : ""}>
                            <TextArea 
                                required
                                rows={5}
                                maxLength={180}
                                // onChange={onChange}
                                // value={stickie}
                                placeholder="What is happening?!"
                            />
                        </Form>
                    </>
                ) : null}
            </Column>
            <Column>{photo ? <Photo src={photo}/> : null}</Column>
        </Wrapper>
    );
}