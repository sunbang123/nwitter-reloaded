import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { db } from "../firebase";
import Stickie from "./stickie";
import { Unsubscribe } from "firebase/auth";

export interface IStickie {
    id: string;
    photo?: string;
    stickie: string;
    userId: string;
    username: string;
    createdAt: number;
}

const Wrapper = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

export default function Timeline() {
    const [stickies, setStickie] = useState<IStickie[]>([]);
    useEffect(()=>{
        let unsubscribe: Unsubscribe | null = null;
        const fetchStickies = async () => {
            const stickiesQuery = query(
                collection(db, "stickies"),
                orderBy("createdAt", "desc"),
                limit(25)
            );
            unsubscribe = await onSnapshot(stickiesQuery, (snapshot) => {
                const stickies = snapshot.docs.map((doc) => {
                    const { stickie, createdAt, userId, username, photo } = doc.data();
                    return {
                        stickie,
                        createdAt,
                        userId,
                        username,
                        photo,
                        id: doc.id,
                    };
                });
                setStickie(stickies);
            });
        };
        fetchStickies();
        return () => {
            unsubscribe && unsubscribe();
        };
    }, []);
    return (
        <Wrapper>
            {stickies.map((stickie) => (
                <Stickie key={stickie.id} {...stickie} />
            ))}
        </Wrapper>
    );
}