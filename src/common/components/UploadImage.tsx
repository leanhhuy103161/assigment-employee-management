const UploadImage = () => (
  <>
    <div className="absolute flex items-center justify-center w-56 h-56 rounded-full bg-base-100 z-50 opacity-0 hover:opacity-80">
      <svg
        width="30"
        height="30"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current"
      >
        <path
          d="M16 18H2C0.89543 18 0 17.1046 0 16V2C0 0.89543 0.89543 0 2 0H16C17.1046 0 18 0.89543 18 2V16C18 17.1046 17.1046 18 16 18ZM2 2V16H16V2H2ZM15 14H3L6 10L7 11L10 7L15 14ZM5.5 8C4.67157 8 4 7.32843 4 6.5C4 5.67157 4.67157 5 5.5 5C6.32843 5 7 5.67157 7 6.5C7 7.32843 6.32843 8 5.5 8Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <img
      src="https://avatars.dicebear.com/api/open-peeps/your-custom-seed.svg"
      className="w-full object-cover z-0 rounded-full"
    />
  </>
);

export default UploadImage;
