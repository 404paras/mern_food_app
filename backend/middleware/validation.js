// Input validation middleware

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (10 digits)
const phoneRegex = /^[0-9]{10}$/;

// Validate registration input
export const validateRegistration = (req, res, next) => {
    const { name, email, password, mobile } = req.body;
    const errors = [];

    // Name validation
    if (!name || typeof name !== 'string') {
        errors.push('Name is required');
    } else if (name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    } else if (name.trim().length > 50) {
        errors.push('Name must not exceed 50 characters');
    }

    // Email validation
    if (!email || typeof email !== 'string') {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
    }

    // Password validation
    if (!password || typeof password !== 'string') {
        errors.push('Password is required');
    } else if (password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    } else if (password.length > 100) {
        errors.push('Password must not exceed 100 characters');
    }

    // Mobile validation
    if (!mobile) {
        errors.push('Mobile number is required');
    } else if (!phoneRegex.test(String(mobile))) {
        errors.push('Mobile number must be 10 digits');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Sanitize inputs
    req.body.name = name.trim();
    req.body.email = email.trim().toLowerCase();
    
    next();
};

// Validate login input
export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    const errors = [];

    // Email validation
    if (!email || typeof email !== 'string') {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
    }

    // Password validation
    if (!password || typeof password !== 'string') {
        errors.push('Password is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Sanitize inputs
    req.body.email = email.trim().toLowerCase();
    
    next();
};

// Validate restaurant input
export const validateRestaurant = (req, res, next) => {
    const { name, address, imgUrl } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Restaurant name is required and must be at least 2 characters');
    }

    if (!address || typeof address !== 'string' || address.trim().length < 5) {
        errors.push('Address is required and must be at least 5 characters');
    }

    if (!imgUrl || typeof imgUrl !== 'string') {
        errors.push('Image URL is required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Sanitize inputs
    req.body.name = name.trim();
    req.body.address = address.trim();
    req.body.imgUrl = imgUrl.trim();
    
    next();
};

// Validate food item input
export const validateFoodItem = (req, res, next) => {
    const { name, description, price, image, quantity } = req.body;
    const errors = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
        errors.push('Food item name is required and must be at least 2 characters');
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
        errors.push('Description is required and must be at least 10 characters');
    }

    if (!price || typeof price !== 'number' || price <= 0) {
        errors.push('Price is required and must be a positive number');
    }

    if (!image || typeof image !== 'string') {
        errors.push('Image URL is required');
    }

    if (!quantity || typeof quantity !== 'number' || quantity < 0) {
        errors.push('Quantity is required and must be a non-negative number');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Sanitize inputs
    req.body.name = name.trim();
    req.body.description = description.trim();
    req.body.image = image.trim();
    
    next();
};

// Validate offer input
export const validateOffer = (req, res, next) => {
    const { couponcode, discount, description } = req.body;
    const errors = [];

    if (!couponcode || typeof couponcode !== 'string' || couponcode.trim().length < 3) {
        errors.push('Coupon code is required and must be at least 3 characters');
    }

    if (!discount || typeof discount !== 'number' || discount <= 0 || discount > 100) {
        errors.push('Discount is required and must be between 1 and 100');
    }

    if (!description || typeof description !== 'string' || description.trim().length < 5) {
        errors.push('Description is required and must be at least 5 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    // Sanitize inputs
    req.body.couponcode = couponcode.trim().toUpperCase();
    req.body.description = description.trim();
    
    next();
};

// Validate MongoDB ObjectId
export const validateObjectId = (paramName) => (req, res, next) => {
    const id = req.params[paramName];
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;

    if (!id || !objectIdRegex.test(id)) {
        return res.status(400).json({ error: `Invalid ${paramName} format` });
    }

    next();
};

// Validate order input
export const validateOrder = (req, res, next) => {
    const { orderId, transactionId, userId, payment, foodItems } = req.body;
    const errors = [];

    if (!orderId || typeof orderId !== 'string') {
        errors.push('Order ID is required');
    }

    if (!transactionId || typeof transactionId !== 'string') {
        errors.push('Transaction ID is required');
    }

    if (!userId || typeof userId !== 'string') {
        errors.push('User ID is required');
    }

    if (!payment || typeof payment !== 'number' || payment <= 0) {
        errors.push('Payment amount is required and must be positive');
    }

    if (!foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
        errors.push('Food items are required');
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    next();
};