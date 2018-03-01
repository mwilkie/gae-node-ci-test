import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';

function makeDateWithinDays(withinDays) {
  return format(subDays(new Date(), Math.floor(Math.random() * withinDays)));
}

export default {
  flipboard: [
    {
      id: 0,
      title: 'This is the post title',
      url: 'thekitchn.com/this-is-the-post-title-0',
      imageUrl: '//via.placeholder.com/140x140',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto maiores. Et perferendis molestiae quisquam. Impedit excepturi consequatur cumque labore doloribus quas ducimus at. Doloremque repellendus quae asperiores repellat non!',
      queueStatus: 'pending',
      publishedAt: makeDateWithinDays(30),
      approvedAt: null,
      rejectedAt: null
    },
    {
      id: 1,
      title: 'This is the post title',
      url: 'thekitchn.com/this-is-the-post-title-1',
      imageUrl: '//via.placeholder.com/140x140',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto maiores. Et perferendis molestiae quisquam. Impedit excepturi consequatur cumque labore doloribus quas ducimus at. Doloremque repellendus quae asperiores repellat non!',
      queueStatus: 'pending',
      publishedAt: makeDateWithinDays(30),
      approvedAt: null,
      rejectedAt: null
    },
    {
      id: 2,
      title: 'This is the post title',
      url: 'thekitchn.com/this-is-the-post-title-2',
      imageUrl: '//via.placeholder.com/140x140',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto maiores. Et perferendis molestiae quisquam. Impedit excepturi consequatur cumque labore doloribus quas ducimus at. Doloremque repellendus quae asperiores repellat non!',
      queueStatus: 'approved',
      publishedAt: makeDateWithinDays(30),
      approvedAt: makeDateWithinDays(10),
      rejectedAt: null
    },
    {
      id: 3,
      title: 'This is the post title',
      url: 'thekitchn.com/this-is-the-post-title-3',
      imageUrl: '//via.placeholder.com/140x140',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto maiores. Et perferendis molestiae quisquam. Impedit excepturi consequatur cumque labore doloribus quas ducimus at. Doloremque repellendus quae asperiores repellat non!',
      queueStatus: 'approved',
      publishedAt: makeDateWithinDays(30),
      approvedAt: makeDateWithinDays(10),
      rejectedAt: null
    },
    {
      id: 4,
      title: 'This is the post title',
      url: 'thekitchn.com/this-is-the-post-title-4',
      imageUrl: '//via.placeholder.com/140x140',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto maiores. Et perferendis molestiae quisquam. Impedit excepturi consequatur cumque labore doloribus quas ducimus at. Doloremque repellendus quae asperiores repellat non!',
      queueStatus: 'rejected',
      publishedAt: makeDateWithinDays(30),
      approvedAt: null,
      rejectedAt: makeDateWithinDays(10)
    },
    {
      id: 5,
      title: 'This is the post title',
      url: 'thekitchn.com/this-is-the-post-title-5',
      imageUrl: '//via.placeholder.com/140x140',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto maiores. Et perferendis molestiae quisquam. Impedit excepturi consequatur cumque labore doloribus quas ducimus at. Doloremque repellendus quae asperiores repellat non!',
      queueStatus: 'rejected',
      publishedAt: makeDateWithinDays(30),
      approvedAt: null,
      rejectedAt: makeDateWithinDays(10)
    },
    {
      id: 6,
      title: 'This is the post title',
      url: 'thekitchn.com/this-is-the-post-title-6',
      imageUrl: '//via.placeholder.com/140x140',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto maiores. Et perferendis molestiae quisquam. Impedit excepturi consequatur cumque labore doloribus quas ducimus at. Doloremque repellendus quae asperiores repellat non!',
      queueStatus: 'approved',
      publishedAt: makeDateWithinDays(30),
      approvedAt: makeDateWithinDays(10),
      rejectedAt: null
    },
    {
      id: 7,
      title: 'This is the post title',
      url: 'thekitchn.com/this-is-the-post-title-7',
      imageUrl: '//via.placeholder.com/140x140',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto maiores. Et perferendis molestiae quisquam. Impedit excepturi consequatur cumque labore doloribus quas ducimus at. Doloremque repellendus quae asperiores repellat non!',
      queueStatus: 'approved',
      publishedAt: makeDateWithinDays(30),
      approvedAt: makeDateWithinDays(10),
      rejectedAt: null
    },
    {
      id: 8,
      title: 'This is the post title',
      url: 'thekitchn.com/this-is-the-post-title-8',
      imageUrl: '//via.placeholder.com/140x140',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, architecto maiores. Et perferendis molestiae quisquam. Impedit excepturi consequatur cumque labore doloribus quas ducimus at. Doloremque repellendus quae asperiores repellat non!',
      queueStatus: 'rejected',
      publishedAt: makeDateWithinDays(30),
      approvedAt: null,
      rejectedAt: makeDateWithinDays(10)
    }
  ]
};
