import { useState } from "react";
import { styled } from "styled-components";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const FormContainer = styled.div`
    background-color: white;
    padding: 5%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    border: 2px solid lightgray;
    padding: 20px;
    border-radius: 20px;
    font-size: 16px;
    color: black;
    background-color: #EFF2CF;
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

const AttachFileButton = styled.label`
    padding: 10px 0px;
    color: #3C950B;
    text-align:center;
    border-radius: 20px;
    border: 1px solid #3C950B;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
`;

const AttachFileInput = styled.input`
    display:none;
`;

const SubmitBtn = styled.input`
    background-color: #3C950B;
    color: white;
    border: none;
    padding: 10px 0px;
    border-radius: 20px;
    font-size: 16px;
    cursor: pointer;
    &:hover,
    &:active {
        opacity: 0.9;
    }
`;

export default function PostStickieForm() {
    const [isLoading, setLoading] = useState(false);
    const [stickie, setStickie] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        setStickie(e.target.value);
    };
    const onFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files && files.length === 1) {
            setFile(files[0]);
        }
    };
    const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = auth.currentUser;
        if(!user || isLoading || stickie === "" || stickie.length > 180) return;
        try {
            setLoading(true);
            const doc = await addDoc(collection(db, "stickies"), {
                stickie,
                createdAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
            });
            if (file) {
                const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
                const result = await uploadBytes(locationRef, file);
                const url = await getDownloadURL(result.ref);
                await updateDoc(doc, {
                    photo: url,
                });
            }
            setStickie("");
            setFile(null);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    }
    return (
        <FormContainer>
            <Form onSubmit={onSubmit}>
                <TextArea 
                    required
                    rows={5}
                    maxLength={180}
                    onChange={onChange}
                    value={stickie}
                    placeholder="What is happening?!"
                />
                <AttachFileButton htmlFor="file">
                    {file?"Photo added ✅":"Add photo"}
                </AttachFileButton>
                <AttachFileInput
                    onChange={onFileChange}
                    type="file"
                    id="file"
                    accept="image/*"
                />
                <SubmitBtn
                    type="submit"
                    value={isLoading ? "Posting..." : "Post Stickie"}
                />
            </Form>
        </FormContainer>
    );
}