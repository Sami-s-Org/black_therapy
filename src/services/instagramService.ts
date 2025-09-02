
export const fetchInstagramMedia = async () => {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v23.0/17841408087285931/media?fields=id%2Cmedia_type%2Cmedia_url%2Cpermalink%2Ctimestamp&access_token=EAAlH4ABtBLoBPVAVoGx9v7gDMpRZCxOaer4oOr2LSsMpGZBWzZApLKyitvMZCVfJZB872YusGGpv04eR6qFepspSk8AV8vAo0EOeWuRzwW1efjZCQZCViOsEhO5DwCya7NkPYnNnZALW5clJbb1HBfnoX7USIaHhxdTzB2PtsCw11Nt4E6oULff8OP8uYJux0AS6bAyWZCM707WZBb8sgaHB7v5hD3PMvqiiIRblY01GPEaMaIzETcqKZAGMFzxGDCWkAZDZD`
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
