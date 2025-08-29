import { Star, Filter, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewsSectionProps {
  rating: number;
  reviewCount: number;
}

const mockReviews = [
  {
    id: 1,
    user: {
      name: 'Sarah M.',
      avatar: '/placeholder.svg',
      verified: true
    },
    rating: 5,
    title: 'Perfect fit and quality!',
    content: 'Love the soft fabric and the fit is exactly as expected. Great value for money.',
    date: '2 days ago',
    helpful: 12,
    photos: ['/placeholder.svg'],
    size: 'M',
    fit: 'True to size'
  },
  {
    id: 2,
    user: {
      name: 'Jessica L.',
      avatar: '/placeholder.svg',
      verified: true
    },
    rating: 4,
    title: 'Great basic tee',
    content: 'Good quality cotton, comfortable to wear. The color is slightly different from photos but still nice.',
    date: '1 week ago',
    helpful: 8,
    photos: [],
    size: 'S',
    fit: 'Runs small'
  }
];

export function ReviewsSection({ rating, reviewCount }: ReviewsSectionProps) {
  const ratingDistribution = [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 }
  ];

  return (
    <div id="reviews-section" className="space-y-4">
      <h3 className="text-xl font-semibold text-text-primary">Reviews</h3>
      
      {/* Rating Overview */}
      <div className="fashion-card p-4">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-text-primary">{rating.toFixed(1)}</div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-text-secondary">{reviewCount} reviews</div>
          </div>
          
          <div className="flex-1 space-y-2">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary w-3">{item.stars}</span>
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-secondary rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-xs text-text-secondary w-8">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Filter Options */}
        <div className="flex items-center space-x-2 mb-4">
          <Button variant="outline" size="sm" className="flex items-center space-x-1">
            <Filter className="w-3 h-3" />
            <span>Most Helpful</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center space-x-1">
            <Camera className="w-3 h-3" />
            <span>With Photos</span>
          </Button>
        </div>
      </div>

      {/* Featured Reviews */}
      <div className="space-y-4">
        {mockReviews.slice(0, 2).map((review) => (
          <div key={review.id} className="fashion-card p-4">
            <div className="flex items-start space-x-3 mb-3">
              <img 
                src={review.user.avatar} 
                alt={review.user.name}
                className="w-10 h-10 rounded-full bg-secondary"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-text-primary">{review.user.name}</span>
                  {review.user.verified && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary">{review.date}</span>
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-text-primary mb-2">{review.title}</h4>
            <p className="text-sm text-text-secondary mb-3 leading-relaxed">{review.content}</p>
            
            {review.photos.length > 0 && (
              <div className="flex space-x-2 mb-3">
                {review.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Review photo ${index + 1}`}
                    className="w-16 h-16 rounded-lg object-cover bg-secondary"
                  />
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <div className="space-x-4">
                <span>Size: {review.size}</span>
                <span>Fit: {review.fit}</span>
              </div>
              <button className="hover:text-text-primary transition-colors">
                Helpful ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* View All Reviews */}
      <Button variant="outline" className="w-full">
        View All {reviewCount} Reviews
      </Button>
    </div>
  );
}