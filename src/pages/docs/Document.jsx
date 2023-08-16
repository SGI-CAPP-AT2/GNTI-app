import { useParams } from 'react-router-dom';
import privacypolicy from './privacypolicy.md';
import { useEffect } from 'react';
import { useState } from 'react';
const Document = () => {
  const { docname } = useParams();
  const [doc, setDoc] = useState('Loading.. doc');
  useEffect(() => {
    const load = async () => {
      if (docname === 'privacypolicy') {
        let doc = await fetch(privacypolicy);
        let md = await doc.text();
        setDoc(md);
      }
    };
    load();
  });
  return <div>{doc}</div>;
};
export default Document;
