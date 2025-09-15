
export const fetchInstagramMedia = async () => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v23.0/17841408087285931/media?fields=id%2Cmedia_type%2Cmedia_url%2Cpermalink%2Ctimestamp&access_token=EAAlH4ABtBLoBPZAPoTDPHDXO1Rd2yBO4Kd7WqjYwMTuRij5yJz1QLMTCHaFTmJXbAAQfVPLUaspZAGZAq8lweqvYpDBvQYteEGbzBxNKRq5JwT1SaOYSVVxNnFbRgDj9N7oHHmd3y2q9W1Euvu06tureEMFuggkJy2228RSAZBWYL07vrTXA3FCixCJJ9AnWZBw6A04tk2kaoUvDkzaGWT0ZCZBFvqNZAZAR2FeZAjkcZAZC7U13HUafl09WKLA4ehe8vgUZD`
    );
    
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
