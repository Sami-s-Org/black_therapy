
export const fetchInstagramMedia = async () => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v23.0/17841408087285931/media?fields=id%2Cmedia_type%2Cmedia_url%2Cpermalink%2Ctimestamp&access_token=EAAlH4ABtBLoBPQ2legqdQQCaBJ4Gzbj7w4l4dTxrZCCtwdIZAEH606iZBT4VU2b5NyICfWVCXszmXGwdDgfBRZAeywr4TrCkb1Tomr1OiUqQqb5SCNQ07O9ZBk06oJoZBAWY5rINFnpzeBzt4EHZAi4q1pELNF8IC3b3rfrZB7A5f0sOh9aVxGh40U8PQaXsK8t5fQq5ZC5YOZAJNpzzZBn4OeyYMN6pJ4CkfMde00r502va2E5YmUNP0ZBEPAZDZD`
    );
    // const response = await fetch(
    //   `https://graph.facebook.com/v23.0/17841408087285931/media?fields=id%2Cmedia_type%2Cmedia_url%2Cpermalink%2Ctimestamp&access_token=EAAlH4ABtBLoBPUSPZBLczVdP3uKFsNUqsZAP0BlmuR1BtFrkd6pkYSTXm5wK3wZCY6m6ebbHxX31F2Tnw1NhNT5ZB9BsQB6ZCyHYA4wXbZCMvvklmNZBy2SHRRlTiaCEZBQZBNHqkm2fCjjQfVF5yub4FDcHIsxglZCwXH2rGgkau2XEF64L3QwOhca4sR3tbZB4maM0QZDZD`
    // );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Instagram media');
    }
    
    const data = await response.json();
    return (data.data || []).filter((item: any) => item.media_type !== 'VIDEO');
  } catch (error) {
    console.error('Error fetching Instagram media:', error);
    return [];
  }
};
