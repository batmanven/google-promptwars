export const verifyRecaptcha = async (action: string) => {
  if (typeof window === "undefined" || !window.grecaptcha) return true;
  
  try {
    const token = await window.grecaptcha.enterprise.execute(
      process.env.NEXT_PUBLIC_RECAPTCHA_KEY, 
      { action }
    );
    return !!token;
  } catch (error) {
    return true; 
  }
};

declare global {
  interface Window {
    grecaptcha: any;
  }
}
