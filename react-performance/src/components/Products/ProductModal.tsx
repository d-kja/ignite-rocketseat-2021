export interface ProductModalProps {
  onAddToWishlist: () => void
  onRequestClose: () => void
}

const ProductModal = ({
  onAddToWishlist,
  onRequestClose,
}: ProductModalProps) => {
  return (
    <div className="fixed inset-0 bg-base-300/75" onClick={onRequestClose}>
      <section
        aria-label="confirm modal"
        className="fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2"
      >
        <h3>Are you sure about that?</h3>
        <div className="mt-2 flex gap-2 w-full btn-group">
          <button className="btn btn-outline" onClick={onRequestClose}>
            Cancel
          </button>
          <button className="btn" onClick={onAddToWishlist}>
            Confirm
          </button>
        </div>
      </section>
    </div>
  )
}

export default ProductModal
